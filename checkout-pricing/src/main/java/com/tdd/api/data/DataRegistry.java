package com.tdd.api.data;

import java.util.Set;
import java.util.UUID;

public interface DataRegistry<T, TEntry> {
    T get(UUID id);

    void save(T data);

    void delete(UUID id);

    Set<TEntry> list();

    void loadAll();
}
