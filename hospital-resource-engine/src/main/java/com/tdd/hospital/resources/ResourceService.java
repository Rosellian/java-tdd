package com.tdd.hospital.resources;

import com.tdd.hospital.database.DataList;
import com.tdd.hospital.resources.database.ResourceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ResourceService {
    private static final Logger logger = LoggerFactory.getLogger(ResourceService.class);

    private final ResourceRepository repository;

    public ResourceService(ResourceRepository repository) {
        this.repository = repository;
    }

    //TODO refactor to reuse more code

    public List<DataList> getLists() {
        logger.info("Getting resource lists");

        List<DataList> lists = repository.getLists();
        logger.info("Retrieved resource lists: {}", lists);

        return lists;
    }

    public List<Resource> getList(UUID id) {
        logger.info("Getting resource list with id: {}", id);

        List<Resource> resources = repository.getList(id);
        logger.info("Retrieved resources {}", resources);

        return resources;
    }

    public void save(DataList list, List<Resource> resources) {
        logger.info("Saving resource list {} {}", list, resources);

        repository.saveList(list, resources);
        logger.info("Saved resource list");
    }
}
