---
title: Elasticsearch - 유저 검색, 실시간 피드 랭킹
author: Cho H.W.
date: 2024-02-19 23:47:00 +0900
categories: [project]
tags: [elastic, logstash]
math: true
mermaid: true
---
## Elasticsearch
---

노래방 웹 서비스 프로젝트를 하며 역색인을 이용해 nickname 검색을 통해 user pk를 반환하는 부분과 logstash를 통해 피드 좋아요 조회수 정보를 mysql 데이터와 일정 주기 간격으로 동기화시켜 실시간 피드 랭킹을 계산할 수 있도록 적용하였습니다.

1. 유저 검색

* MySQL user 테이블에 매칭되는 user document 클래스를 생성해 회원 가입 시 elastic search db에 데이터를 넣는다
* 닉네임 검색 시 elastic search query를 통해 
