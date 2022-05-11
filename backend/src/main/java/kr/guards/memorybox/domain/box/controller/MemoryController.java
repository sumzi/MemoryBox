package kr.guards.memorybox.domain.box.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.request.AllMemoriesPostReq;
import kr.guards.memorybox.domain.box.service.MemoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.security.Principal;

@Slf4j
@Controller
@Tag(name = "기억", description = "기억함에 넣는 기억 관련 API")
@RequestMapping("/api/memory")
public class MemoryController {
    private final MemoryService memoryService;

    public MemoryController(MemoryService memoryService) {
        this.memoryService = memoryService;
    }

    @Tag(name = "기억")
    @Operation(summary = "기억틀 생성(유저)", description = "기억함에 새 사용자의 기억을 담을 틀 추가")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "사용자 기억틀 생성 완료"),
            @ApiResponse(responseCode = "203", description = "사용자 기억틀이 이미 생성되어 있음"),
            @ApiResponse(responseCode = "208", description = "사용자가 기억을 이미 담았습니다"),
            @ApiResponse(responseCode = "403", description = "이미 진행 중인 기억함입니다"),
            @ApiResponse(responseCode = "404", description = "사용자 기억틀 생성 중 오류 발생"),
    })
    @GetMapping("/{boxId}")
    public ResponseEntity<String> boxCreateUserFrame(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId, @ApiIgnore Principal principal) {
        log.info("boxCreateUserFrame - Call");
        Long userSeq = Long.valueOf(principal.getName());

        int divide = memoryService.boxCreateUserFrame(boxId, userSeq);
        if (divide == 1) {
            return ResponseEntity.status(201).build();
        } else if (divide == 2) {
            return ResponseEntity.status(203).build();
        } else if (divide == 3) {
            return ResponseEntity.status(208).build();
        } else if (divide == 4) {
            return ResponseEntity.status(403).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억")
    @Operation(summary = "기억들 저장(유저)", description = "기억함에 사용자의 기억들을 저장")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "사용자 기억들 저장 완료"),
            @ApiResponse(responseCode = "404", description = "사용자 기억들 저장 중 오류 발생"),
    })
    @PutMapping("/{boxId}")
    public ResponseEntity<String> saveAllMemories(@Parameter(description = "기억함 ID") @PathVariable String boxId,
                                                @RequestBody AllMemoriesPostReq allMemoriesPostReq, @ApiIgnore Principal principal) {
        log.info("allMemorySave - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (memoryService.saveAllMemories(allMemoriesPostReq, boxId, userSeq)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
