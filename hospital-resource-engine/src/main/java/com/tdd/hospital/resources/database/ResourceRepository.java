package com.tdd.hospital.resources.database;

import com.tdd.hospital.database.DataEntry;
import com.tdd.hospital.database.DataList;
import com.tdd.hospital.database.DataRepository;
import com.tdd.hospital.resources.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.tdd.hospital.resources.database.RepositoryUtils.*;

@Repository
public class ResourceRepository implements DataRepository<Resource> {
    private static final Logger logger = LoggerFactory.getLogger(ResourceRepository.class);

    private final JdbcTemplate jdbcTemplate;

    public ResourceRepository(@Qualifier("resourcesJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbcTemplate = jdbc;
    }

    //TODO refactor to reuse more code

    @Override
    public List<DataList> getLists() {
        try {
            logger.info("Loading resource lists");

            List<DataList> lists = jdbcTemplate.query(GET_RESOURCE_LISTS, listRowMapper);
            logger.info("Loaded resource lists {}", lists);

            return lists;
        }  catch (Exception e) {
            logger.error("Failed to load resource lists", e);
            return null;
        }
    }

    @Override
    public List<Resource> getList(UUID listId) {
        try {
            logger.info("Loading resource list by id: {}", listId);
            List<String> resourceData = jdbcTemplate.queryForList(GET_RESOURCES, String.class, listId);

            List<Resource> resources = readResourceData(resourceData);
            logger.info("Loaded resource list: {}", resources);

            return resources;
        }  catch (Exception e) {
            logger.error("Failed to load resource list", e);
            return null;
        }
    }

    @Override
    public void saveList(DataList list, List<Resource> resources) {
        try {
            logger.info("Saving resource list: {}", list);
            jdbcTemplate.update(SAVE_RESOURCE_LIST, list.id(), list.name(), list.version());

            logger.info("Deleting resources in list {}", list);
            jdbcTemplate.update(DELETE_RESOURCES_IN_LIST, list.id());

            saveResources(list, resources);

            logger.info("Saved resource list {} {}", list, resources);
        }  catch (Exception e) {
            logger.error("Failed to save resource lists", e);
        }
    }

    private void saveResources(DataList list, List<Resource> resources) {
        logger.info("Saving resources in list {} {}", list, resources);

        resources.stream()
                .map(patient -> toEntry(patient, list.id()))
                .forEach(this::saveResource);
    }

    private void saveResource(DataEntry resource) {
        logger.info("Saving resource data as json {}", resource);

        jdbcTemplate.update(SAVE_RESOURCE, resource.id(), resource.listId(), resource.data());
    }
}