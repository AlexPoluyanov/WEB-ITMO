package ru.alex.entity;

import java.time.format.DateTimeFormatter;


public interface Constant {
    DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yy HH:mm:ss");
    String ATTRIBUTE_NAME = "results";
}
