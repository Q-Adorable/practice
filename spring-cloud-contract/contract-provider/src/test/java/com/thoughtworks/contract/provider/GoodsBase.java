package com.thoughtworks.contract.provider;

import com.github.database.rider.core.api.configuration.DBUnit;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.spring.api.DBRider;
import com.thoughtworks.contract.provider.controller.GoodsController;
import com.thoughtworks.contract.provider.controller.ProductController;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.setup.StandaloneMockMvcBuilder;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ContractApplication.class, webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@DBRider
@ActiveProfiles("test")
@DBUnit(caseSensitiveTableNames = true)
@DataSet("goods.yml")
public abstract class GoodsBase {
    @Autowired
    private GoodsController goodsController;

    @Before
    public void setup() {
        StandaloneMockMvcBuilder standaloneMockMvcBuilder = MockMvcBuilders.standaloneSetup(goodsController);
        RestAssuredMockMvc.standaloneSetup(standaloneMockMvcBuilder);
    }
}
