package com.tdd.api.prices;

import com.tdd.api.data.DataRegistry;
import com.tdd.api.prices.data.PriceList;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class PriceRegistry implements DataRegistry<PriceList> {
    private final PriceRepository repository;
    private final Map<String, PriceList> cache = new ConcurrentHashMap<>();

    public PriceRegistry(PriceRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void init() {
        loadAll();
    }

    @Override
    public PriceList get(String name) {
        return cache.get(name);
    }

    @Override
    public void save(String name, PriceList priceList) {
        cache.put(name, priceList);
        repository.save(name, priceList);
    }

    @Override
    public void delete(String name) {
        cache.remove(name);
        repository.delete(name);
    }

    @Override
    public Set<String> listNames() {
        return cache.keySet();
    }

    @Override
    public void loadAll() {
        for (String name : repository.list()) {
            cache.put(name, repository.load(name));
        }
    }
}
