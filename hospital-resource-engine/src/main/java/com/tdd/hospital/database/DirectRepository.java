package com.tdd.hospital.database;

import java.util.List;
import java.util.UUID;

public interface DirectRepository<T> extends DataRepository {

    List<T> getList(UUID listId);
    void saveList(DataList list, List<T> data);
}
