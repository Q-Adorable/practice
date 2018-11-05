package com.thoughtworks.tw_school_diary.repository;

import com.thoughtworks.tw_school_diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Integer> {
}
