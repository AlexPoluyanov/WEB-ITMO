package ru.alex.servlet;

import ru.alex.entity.ResultsListBean;

import ru.alex.entity.Constant;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


@WebServlet(name = "ControllerServlet", value = "/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        createBeanIfNull(req.getSession());
        getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        createBeanIfNull(req.getSession());
        resp.setContentType("text/html;charset=utf-8");
        getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req, resp);
    }

    private void createBeanIfNull(HttpSession session) {
        if (session.getAttribute(Constant.ATTRIBUTE_NAME) != null) {
            return;
        }
        session.setAttribute(Constant.ATTRIBUTE_NAME, new ResultsListBean());
    }
}
