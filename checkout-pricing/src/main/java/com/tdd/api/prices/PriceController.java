package com.tdd.api.prices;

import com.tdd.api.data.DataController;
import com.tdd.api.prices.data.PriceList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping(value = "/api/prices", produces = "application/json; charset=utf-8")
public class PriceController implements DataController<PriceList> {
    private static final Set<String> PROTECTED = Set.of("default");
    private static final Logger logger = LoggerFactory.getLogger(PriceController.class);

    private final PriceRegistry registry;

    public PriceController(PriceRegistry registry) {
        this.registry = registry;
    }

    @Override
    public Set<String> list() {
        logger.info("Incoming request for price lists");
        Set<String> priceLists = registry.listNames();
        logger.info("Returning available price lists {}", priceLists);

        return priceLists;
    }

    @Override
    public PriceList load(String name) {
        logger.info("Incoming request for price list {}", name);
        PriceList priceLists = registry.get(name);
        logger.info("Response {}", priceLists);

        return priceLists;
    }

    @Override
    public void save(String name, PriceList priceList) {
        logger.info("Incoming request to save priceList {}: {}", name, priceList);
        registry.save(name, priceList);
    }

    @Override
    public ResponseEntity<Void> delete(String name) {
        logger.info("Incoming request to delete priceList {}", name);

        String normalizedName = name.replace(" ", "").toLowerCase();
        if (PROTECTED.contains(normalizedName)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        registry.delete(name);
        return ResponseEntity.noContent().build();
    }
}
