package kr.guards.memorybox.domain.box.db.repository;

import kr.guards.memorybox.domain.box.db.entity.Box;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface BoxRepository extends JpaRepository<Box, String> {
    @Transactional
    Integer deleteAllByUserSeq(Long userSeq);

    List<Box> findAllByUserSeq(Long userSeq);
}
