package com.tdd.hospital.api.resources;

import com.tdd.hospital.database.DataList;
import com.tdd.hospital.resources.Resource;
import com.tdd.hospital.resources.ResourceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {
    private static final Logger logger = LoggerFactory.getLogger(ResourceController.class);

    private final ResourceService service;

    public ResourceController(ResourceService service) {
        this.service = service;
    }

    @GetMapping
    public List<DataList> getLists() {
        logger.info("Request for all resource lists");

        List<DataList> lists = service.getLists();
        logger.info("Response returned resource lists: {}", lists);

        return lists;
    }

    @GetMapping("/{listId}")
    public List<Resource> getList(@PathVariable UUID listId) {
        logger.info("Request for resource list with id: {}", listId);

        List<Resource> resources = service.getList(listId);
        logger.info("Response resource list: {}", resources);

        return resources;
    }

    @PostMapping
    public void save(@RequestBody ResourceListRequest request) {
        logger.info("Request to save resource list");

        service.save(request.list(), request.resources());
    }
}
