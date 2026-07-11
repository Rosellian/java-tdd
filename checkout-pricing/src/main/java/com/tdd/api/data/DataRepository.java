package com.tdd.api.data;

import java.util.List;
import java.util.UUID;

public interface DataRepository<T, TEntry> {
    T load(UUID id);

    TEntry loadEntryByName(String name);

    void save(T data);

    void delete(UUID id);

    List<TEntry> list();
}
