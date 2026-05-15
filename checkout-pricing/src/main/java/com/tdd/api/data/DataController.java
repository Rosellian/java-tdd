package com.tdd.api.data;

import org.springframework.web.bind.annotation.*;

import java.util.Set;

public interface DataController<T> {
    @GetMapping
    Set<String> list();

    @GetMapping("/{name}")
    T load(@PathVariable String name);

    @PostMapping("/{name}")
    void save(@PathVariable String name, @RequestBody T data);
}
