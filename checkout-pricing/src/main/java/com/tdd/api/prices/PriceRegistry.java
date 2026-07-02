package com.tdd.api.prices;

import com.tdd.api.data.DataRegistry;
import com.tdd.api.prices.data.CachedPriceList;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.prices.data.PriceListEntry;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import static com.tdd.api.prices.data.CachedPriceList.from;
import static java.util.stream.Collectors.toSet;

@Component
public class PriceRegistry implements DataRegistry<PriceList, PriceListEntry> {
    private static final Logger logger = LoggerFactory.getLogger(PriceRegistry.class);
    private final PriceRepository repository;
    private final Map<UUID, CachedPriceList> cache = new ConcurrentHashMap<>();

    public PriceRegistry(PriceRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void init() {
        loadAll();
    }

    @Override
    public PriceList get(UUID id) {
        CachedPriceList priceList = cache.get(id);

        return priceList != null ? priceList.priceList() : null;
    }

    @Override
    public void save(PriceList priceList) {
        UUID id = priceList.id();
        logger.debug("Saving price list {} {}", id, priceList);
        cache.put(id, from(priceList));
        repository.save(priceList);
    }

    @Override
    public void delete(UUID id) {
        logger.debug("Deleting price list with id {}", id);
        cache.remove(id);
        repository.delete(id);
    }

    @Override
    public Set<PriceListEntry> list() {
        Set<PriceListEntry> entries = getCachedEntries();
        logger.info("Price lists {}", entries);

        return entries;
    }

    @Override
    public void loadAll() {
        for (PriceListEntry entry : repository.list()) {
            UUID id = entry.id();
            PriceList priceList = repository.load(id);
            cache.put(id, from(priceList));
        }
    }

    private Set<PriceListEntry> getCachedEntries() {
        return cache.values().stream()
                .map(CachedPriceList::entry)
                .collect(toSet());
    }
}
