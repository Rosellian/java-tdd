package com.tdd.hospital.config.resources;

import com.tdd.hospital.database.DataList;
import com.tdd.hospital.resources.Resource;
import com.tdd.hospital.resources.ResourceType;
import com.tdd.hospital.resources.database.ResourceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Component
public class ResourceDataLoader {
    private static final Logger logger = LoggerFactory.getLogger(ResourceDataLoader.class);

    private final ResourceRepository repository;

    public ResourceDataLoader(ResourceRepository repository) {
        this.repository = repository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void run() {
        String name = "Default";

        //TODO Make more robust, maybe add more standard lists
        List<DataList> lists = repository.getLists();

        if(lists != null && !lists.isEmpty()) {
            logger.info("Resource list '{}' already exists. Skipping import.", lists.getFirst());
            return;
        }

        logger.info("Creating default resource list: {}", name);
        DataList list = new DataList(UUID.randomUUID(), name, "v1");

        List<Resource> resources = createDefaultResources();

        repository.saveList(list, resources);
    }

    private List<Resource> createDefaultResources() {
        //TODO Create bigger default list

        return Arrays.stream(ResourceType.values())
                .map(type -> new Resource(UUID.randomUUID(), type, 1, 0))
                .toList();
    }
}
