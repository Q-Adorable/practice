package com.thoughtworks.tw_school_diary.controller.request;

import lombok.Data;

import java.util.Date;

@Data
public class AddDiaryRequest {
    private String content;
    private String date;
}
