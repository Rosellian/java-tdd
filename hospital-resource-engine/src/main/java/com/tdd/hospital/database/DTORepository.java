package com.tdd.hospital.database;

import java.util.List;
import java.util.UUID;

public interface DTORepository<T, DTO> extends DataRepository {

    List<DTO> getList(UUID listId);
    void saveList(DataList list, List<T> data);
}