package com.thoughtworks.contract.consumer.controller;

import com.thoughtworks.contract.consumer.entity.Goods;
import com.thoughtworks.contract.consumer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/consumers")
public class ConsumerController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity getAllProduct() {
        return ResponseEntity.ok(productService.getAll());
    }
}
