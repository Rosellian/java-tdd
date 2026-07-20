package com.tdd.hospital.api.resources;

import com.tdd.hospital.database.DataList;
import com.tdd.hospital.resources.Resource;

import java.util.List;

public record ResourceListRequest(
        DataList list,
        List<Resource> resources
) {}
