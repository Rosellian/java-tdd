package com.tdd.hospital.resources.database;

import com.tdd.hospital.database.DataEntry;
import com.tdd.hospital.resources.Resource;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.UUID;

import static com.tdd.hospital.database.DataRepository.*;

public class RepositoryUtils {
    private static final String lIST_TABLE_NAME = "resource_lists";
    private static final String DATA_TABLE_NAME = "resources";

    public static final String GET_RESOURCE_LISTS = getListsQuery(lIST_TABLE_NAME);
    public static final String GET_RESOURCES = getDataItemsQuery(DATA_TABLE_NAME);
    public static final String SAVE_RESOURCE_LIST = saveListQuery(lIST_TABLE_NAME);
    public static final String DELETE_RESOURCES_IN_LIST = deleteDataItemsQuery(DATA_TABLE_NAME);
    public static final String SAVE_RESOURCE = saveDataItemQuery(DATA_TABLE_NAME);

    private static final ObjectMapper mapper = new ObjectMapper();

    private RepositoryUtils() {}

    static List<Resource> readResourceData(List<String> resourceData) {
        return resourceData.stream()
                .map(data -> mapper.readValue(data, Resource.class))
                .toList();
    }

    static DataEntry toEntry(Resource resource, UUID listId) {
        String json = mapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(resource);

        return new DataEntry(resource.id(), listId, json);
    }
}
