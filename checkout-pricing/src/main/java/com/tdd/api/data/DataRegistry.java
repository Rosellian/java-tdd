package com.tdd.api.data;

import java.util.Set;

public interface DataRegistry<T> {
    T get(String name);

    void save(String name, T data);

    void delete(String name);

    Set<String> listNames();

    void loadAll();
}
