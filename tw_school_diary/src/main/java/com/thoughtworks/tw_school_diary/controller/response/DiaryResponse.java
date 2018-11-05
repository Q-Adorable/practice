package com.thoughtworks.tw_school_diary.controller.response;

import lombok.Data;

@Data
public class DiaryResponse {
    private int id;
    private String date;
    private String content;
    private String changeDiary;

    public DiaryResponse(int id, String date, String content, String changeDiary) {
        this.id = id;
        this.date = date;
        this.content = content;
        this.changeDiary = changeDiary;
    }
}
