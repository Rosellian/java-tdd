package com.tdd.api.data;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

public interface DataController<T, TEntry> {
    @GetMapping
    Set<TEntry> list();

    @GetMapping("/{id}")
    T load(@PathVariable UUID id);

    @PostMapping("/{id}")
    void save(@PathVariable UUID id, @RequestBody T data);

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable UUID id);
}
