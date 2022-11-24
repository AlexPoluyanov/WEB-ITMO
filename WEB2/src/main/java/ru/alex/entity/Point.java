package ru.alex.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;


@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Data
public class Point implements Serializable {
    double x, y, r;
    boolean clicked;
}
