package com.tdd.config.prices;

import com.tdd.api.prices.PriceRepository;
import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.samples.SKUs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.UUID;

@Component
public class PriceDataLoader {
    private static final Logger logger = LoggerFactory.getLogger(PriceDataLoader.class);

    private final PriceRepository repository;

    public PriceDataLoader(PriceRepository repository) {
        this.repository = repository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void run() {
        String name = "Default";

        if(repository.loadEntryByName(name) != null) {
            logger.info("Price list '{}' already exists. Skipping import.", name);
            return;
        }

        logger.info("Creating default price list: {}", name);

        var prices = Arrays.stream(SKUs.values())
                .map(sku -> new Price(sku.name(), sku.unitPrice))
                .toList();
        var priceList = new PriceList(UUID.randomUUID(), name, "v1", prices);

        repository.save(priceList);

        logger.info("Imported default price list with SKUs A–E.");
    }
}
