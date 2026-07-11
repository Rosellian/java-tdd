package com.tdd.api.prices;

import com.tdd.api.data.DataController;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.prices.data.PriceListEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/prices", produces = "application/json; charset=utf-8")
public class PriceController implements DataController<PriceList, PriceListEntry> {
    private static final Set<String> PROTECTED = Set.of("default");
    private static final Logger logger = LoggerFactory.getLogger(PriceController.class);

    private final PriceRegistry registry;

    public PriceController(PriceRegistry registry) {
        this.registry = registry;
    }

    @Override
    public Set<PriceListEntry> list() {
        logger.info("Incoming request for price lists");
        Set<PriceListEntry> priceLists = registry.list();
        logger.info("Returning available price lists {}", priceLists);

        return priceLists;
    }

    @Override
    public PriceList load(UUID id) {
        logger.info("Incoming request for price list with id {}", id);
        PriceList priceLists = registry.get(id);
        logger.info("Response {}", priceLists);

        return priceLists;
    }

    @Override
    public void save(UUID id, PriceList priceList) {
        logger.info("Incoming request to save priceList {}: {}", id, priceList);
        registry.save(priceList);
    }

    @Override
    public ResponseEntity<Void> delete(UUID id) {
        logger.info("Incoming request to delete priceList with id {}", id);

        if (isProtected(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        registry.delete(id);

        return ResponseEntity.noContent().build();
    }

    private boolean isProtected(UUID id) {
        PriceList priceList = registry.get(id);

        String normalizedName = priceList.name().replace(" ", "").toLowerCase();

        return PROTECTED.contains(normalizedName);
    }
}
