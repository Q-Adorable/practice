package com.thoughtworks.tw_school_diary.controller;

import com.thoughtworks.tw_school_diary.entity.Diary;
import com.thoughtworks.tw_school_diary.controller.request.AddDiaryRequest;
import com.thoughtworks.tw_school_diary.exception.DiaryNotFoundException;
import com.thoughtworks.tw_school_diary.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequestMapping("/diaries")
@RestController
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    @PostMapping
    public ResponseEntity addDiary(@RequestBody AddDiaryRequest addDiaryRequest) {
        int id = diaryService.addDiary(addDiaryRequest);
        return ResponseEntity.created(URI.create("/diaries" + id)).build();
    }

    @GetMapping
    public ResponseEntity getDiary(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "2") int pageSize) {
        return ResponseEntity.ok(diaryService.getDiary(page,pageSize));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteDiary(@PathVariable int id) {
        diaryService.deleteDiary(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity updateDiary(@RequestBody Diary updateDiaryRequest, @PathVariable int id) {
        diaryService.updateDiary(updateDiaryRequest, id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void DiaryNotFoundException(DiaryNotFoundException ex){}
}
