package kr.guards.memorybox.domain.box.response;


import io.swagger.v3.oas.annotations.media.Schema;
import kr.guards.memorybox.domain.box.db.bean.CloseBoxReadyBean;
import kr.guards.memorybox.domain.box.db.bean.OpenBoxReadyBean;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CloseBoxReadyListGetRes {
    @Schema(description = "기억함에 참여한 사람 목록과 승인 여부")
    List<CloseBoxReadyBean> closeBoxReadyList = null;

    @Schema(description = "기억함에 참여한 전체 사람의 수")
    Integer allUserCount = 0;

    @Schema(description = "기억담기를 완료한 사람 수")
    Integer closeBoxReadyCount = 0;

    @Schema(description = "기억함 묻을 수 있는지 여부")
    boolean closeBoxReadyCheck = false;

    @Schema(description = "기억함 방장 여부")
    boolean isCreator = false;

    @Schema(description = "본인의 userSeq")
    Long userSeq;


    public static CloseBoxReadyListGetRes of (List<CloseBoxReadyBean> closeBoxReadyList, Integer closeBoxReadyCount, boolean isCreator, Long userSeq) {
        CloseBoxReadyListGetRes res = new CloseBoxReadyListGetRes();
        res.setCloseBoxReadyList(closeBoxReadyList);
        res.setAllUserCount(closeBoxReadyList.size());
        res.setCloseBoxReadyCount(closeBoxReadyCount);
        res.setCloseBoxReadyCheck(closeBoxReadyList.size() == closeBoxReadyCount);
        res.setCreator(isCreator);
        res.setUserSeq(userSeq);

        return res;
    }
}
