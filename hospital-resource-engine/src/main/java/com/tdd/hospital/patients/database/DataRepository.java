package com.tdd.hospital.patients.database;

import java.util.List;
import java.util.UUID;

public interface DataRepository<T> {
    List<DataList> getLists();
    List<T> getList(UUID listId);
    void saveList(DataList list, List<T> data);
}