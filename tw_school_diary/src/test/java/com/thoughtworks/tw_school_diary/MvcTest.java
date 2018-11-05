package com.thoughtworks.tw_school_diary;

import com.github.database.rider.core.api.configuration.DBUnit;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.spring.api.DBRider;
import com.thoughtworks.tw_school_diary.controller.DiaryController;
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
@SpringBootTest(classes = TwSchoolDiaryApplication.class, webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@DBRider
@DBUnit(caseSensitiveTableNames = true)
@ActiveProfiles("test")
@DataSet("diary.yml")
public abstract class MvcTest {

    @Autowired
    private DiaryController diaryController;
    @Before
    public void setup() {
        StandaloneMockMvcBuilder standaloneMockMvcBuilder = MockMvcBuilders.standaloneSetup(diaryController);
        RestAssuredMockMvc.standaloneSetup(standaloneMockMvcBuilder);
    }

}
