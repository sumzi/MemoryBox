package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.response.UserMypageGetRes;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;

@Service
public interface UserService{
    String userLogin(String authorizedCode);
    User getUserInfoByToken(String accessToken);

    // 마이페이지
    UserMypageGetRes getUserMypage(Long userSeq);
    Boolean modifyUserProfileImg(Long userSeq, MultipartHttpServletRequest multipartFile);
    Boolean deleteUser(Long userSeq, HttpServletRequest request);
}
