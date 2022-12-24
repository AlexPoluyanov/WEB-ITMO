package ru.alex.weblab3.bean;

import com.google.gson.GsonBuilder;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.validation.ValidationException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import ru.alex.weblab3.entity.Result;
import ru.alex.weblab3.util.Checker;

import java.io.Serializable;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.function.Consumer;

@Named
@SessionScoped
@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResultsBean implements Serializable {

    final EntityManagerFactory entityManagerFactory =
            Persistence.createEntityManagerFactory("connection");
    final List<Result> results = new CopyOnWriteArrayList<>();
    Result current = new Result();

    public ResultsBean() {
        initTransaction(manager -> results.addAll(manager
                .createQuery("SELECT result FROM Result result", Result.class)
                .getResultList()
        ));
    }




    public void addResultFromPlot() {
        var params = FacesContext.getCurrentInstance()
                .getExternalContext().getRequestParameterMap();

        try {
            double x = Double.parseDouble(params.get("x")),
                y = Double.parseDouble(params.get("y"));

            if (x >= -3 && x <= 5 && y > -3 && y < 5) {
                current.setX(x);
                current.setY(y);
                addResult();
            } else throw new ValidationException();
        } catch (Exception ex) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(
                    FacesMessage.SEVERITY_ERROR,
                    "Validation Error",
                    "Wrong parameters values."
            ));
        }
    }

    public void addResult() {
        current.setSuccessful(Checker.isOnPlot(current.getX(), current.getY(), current.getR()));
        current.setTime(System.currentTimeMillis());
        results.add(current);
        initTransaction(manager -> manager.persist(current));
        current = current.clone();
    }

//    public void clearResults() {
//        initTransaction(manager -> {
//            for (Result r : results) {
//                manager.remove(r);
//            }
//        });
//        results.clear();
//
//    }

    public void clearResults() {
        initTransaction(manager -> {
        for (Result r : manager
                .createQuery("SELECT result FROM Result result", Result.class)
                .getResultList()) {


                manager.remove(r);

        }
        });        results.clear();


    }

    public String parseResultsToJson() {
        return new GsonBuilder().create().toJson(results.stream()
                .peek(result -> result.setSuccessful(Checker.isOnPlot(
                        result.getX(),
                        result.getY(),
                        current.getR()
                )))
                .toArray());
    }

    private void initTransaction(Consumer<EntityManager> transaction) {
        EntityManager manager = entityManagerFactory.createEntityManager();
        try {
            manager.getTransaction().begin();
            transaction.accept(manager);
            manager.getTransaction().commit();
        } catch (Exception ex) {
            if (manager.getTransaction().isActive()) {
                manager.getTransaction().rollback();
            }
            System.out.println("An exception occurred during transaction.");
            ex.printStackTrace();
        } finally {
            manager.close();
        }
    }
}
