package ru.alex.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class ResultsListBean implements Serializable {
    private final List<Result> results = new CopyOnWriteArrayList<>();

    @Override
    public String toString() {
        return results.stream()
                .map(Result::toString)
                .collect(Collectors.joining());
    }
}
