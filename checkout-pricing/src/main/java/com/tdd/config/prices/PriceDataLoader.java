package com.tdd.config.prices;

import com.tdd.api.prices.PriceRepository;
import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.samples.SKUs;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class PriceDataLoader {
    private final PriceRepository repository;

    public PriceDataLoader(PriceRepository repository) {
        this.repository = repository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void run() {
        String name = "Default";

        if(repository.load(name) != null) {
            System.out.println("Price list '" + name + "' already exists.");
        }

        System.out.println("Creating default price list: " + name);

        var prices = Arrays.stream(SKUs.values())
                .map(sku -> new Price(sku.name(), sku.unitPrice))
                .toList();
        var priceList = new PriceList(name, "v1", prices);

        repository.save(name, priceList);

        System.out.println("Imported default price list with SKUs A–E.");
    }
}
