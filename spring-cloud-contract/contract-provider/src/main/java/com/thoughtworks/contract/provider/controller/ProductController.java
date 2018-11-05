package com.thoughtworks.contract.provider.controller;

import com.thoughtworks.contract.provider.entity.Product;
import com.thoughtworks.contract.provider.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity getAll() {
        return ResponseEntity.ok(productService.getAll());
    }

    @PostMapping
    public ResponseEntity add(@RequestBody Product product) {
        Long productId = productService.add(product);
        return ResponseEntity.created(URI.create("/products/" + productId)).build();
    }
}
