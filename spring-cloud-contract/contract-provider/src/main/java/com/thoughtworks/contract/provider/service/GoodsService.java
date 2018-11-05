package com.thoughtworks.contract.provider.service;

import com.thoughtworks.contract.provider.entity.Goods;
import com.thoughtworks.contract.provider.repository.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodsService {
    private final GoodsRepository goodsRepository;

    @Autowired
    public GoodsService(GoodsRepository goodsRepository) {
        this.goodsRepository = goodsRepository;
    }


    public Long add(Goods goods) {
        Goods savedGoods = goodsRepository.save(goods);
        return savedGoods.getId();
    }
}
