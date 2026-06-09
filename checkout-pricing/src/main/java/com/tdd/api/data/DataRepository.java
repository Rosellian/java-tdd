package com.tdd.api.data;

import java.util.List;

public interface DataRepository<T> {
    T load(String name);

    void save(String name, T data);

    void delete(String name);

    List<String> list();
}
