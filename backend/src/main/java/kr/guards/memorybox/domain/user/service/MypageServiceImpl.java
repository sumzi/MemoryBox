package kr.guards.memorybox.domain.user.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.box.db.repository.BoxRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxUserFileRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxUserRepository;
import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import kr.guards.memorybox.domain.user.db.repository.UserRepositorySpp;
import kr.guards.memorybox.domain.user.response.UserMypageGetRes;
import kr.guards.memorybox.global.auth.KakaoOAuth2;
import kr.guards.memorybox.global.util.AES256Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class MypageServiceImpl implements MypageService{
    @Value("${app.file.main.path}")
    private String filePath;

    @Value("${app.file.profile.dir}")
    private String profileDir;

    @Value("${app.baseurl}")
    private String baseUrl;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    private final UserRepository userRepository;
    private final UserRepositorySpp userRepositorySpp;
    private final BoxRepository boxRepository;
    private final BoxUserRepository boxUserRepository;
    private final BoxUserFileRepository boxUserFileRepository;

    private final UserService userService;
    private final KakaoOAuth2 kakaoOAuth2;
    private final AES256Util aes256Util;
    private final AmazonS3Client amazonS3Client;

    @Autowired
    public MypageServiceImpl(UserRepository userRepository, UserRepositorySpp userRepositorySpp,
                             BoxRepository boxRepository, BoxUserRepository boxUserRepository, BoxUserFileRepository boxUserFileRepository,
                             UserService userService, KakaoOAuth2 kakaoOAuth2, AES256Util aes256Util, AmazonS3Client amazonS3Client) {
        this.userRepository = userRepository;
        this.userRepositorySpp = userRepositorySpp;
        this.boxRepository = boxRepository;
        this.boxUserRepository = boxUserRepository;
        this.boxUserFileRepository = boxUserFileRepository;

        this.userService = userService;
        this.kakaoOAuth2 = kakaoOAuth2;
        this.aes256Util = aes256Util;

        this.amazonS3Client = amazonS3Client;
    }

    @Override
    public UserMypageGetRes getUserMypage(Long userSeq) {
        Optional<User> findUser = userRepository.findById(userSeq);
        if (findUser.isPresent() == false) { // ?????? ?????? ?????? ??????
            return null;
        }
        User user = findUser.get();
        UserMypageGetRes userMypageInfo = new UserMypageGetRes();

        userMypageInfo.setUserSeq(user.getUserSeq());
        userMypageInfo.setUserKakaoId(user.getUserKakaoId());
        userMypageInfo.setUserEmail(user.getUserEmail());
        userMypageInfo.setUserNickname(user.getUserNickname());
        userMypageInfo.setUserBoxRemain(user.getUserBoxRemain());
        userMypageInfo.setUserProfileImage(user.getUserProfileImage());

        return userMypageInfo;
    }

    @Override
    public Boolean modifyUserProfileImg(Long userSeq, String imgUrl) {
        Long isComplete = userRepositorySpp.modifyUserProfileImgUrl(userSeq, imgUrl);
        if (isComplete == 0L) {
            log.error("modifyUserProfileImg - User ???????????? ????????? ????????? ?????? ?????? ??????");
            return false;
        }
        return true;
    }

    @Override
    public Boolean deleteUser(Long userSeq, HttpServletRequest request) {
        // 1. DB?????? ??????
        // 1-1. ????????? ?????? ?????? ?????? (????????? ??????)
        // 1) ?????? ?????? ????????? ???????????? ?????? ????????? ????????????
        List<Box> boxByUserSeq = boxRepository.findAllByUserSeq(userSeq);

        // 2) ?????? ????????? ????????? ??????
        for (Box box : boxByUserSeq) {
            // S3?????? ????????? ????????? ???????????? ?????? ??????
            for (S3ObjectSummary file : amazonS3Client.listObjects(bucket, box.getBoxId() + "/").getObjectSummaries()) {
                amazonS3Client.deleteObject(bucket, file.getKey());
            }
            // 3) ?????? ??????
            boxRepository.delete(box);
        }

        try {
            // 1-2. ????????? ????????? ????????? ?????? (???????????? ??????)
            List<BoxUser> boxUserByUserSeq = boxUserRepository.findBoxUserByUserSeq(userSeq);
            for (BoxUser boxUser : boxUserByUserSeq) {
                // S3?????? ?????? ??????
                if (boxUser.getBoxUserVoice() != null) {
                    String key = aes256Util.decrypt(boxUser.getBoxUserVoice());
                    if (key != null) {
                        key = key.substring(30);
                        amazonS3Client.deleteObject(bucket, key);
                    }
                }

                // S3?????? ?????? ??? ?????? ??????
                List<BoxUserFile> boxUserFileList = boxUserFileRepository.findAllByBoxUserSeq(boxUser.getBoxUserSeq());
                for (BoxUserFile boxUserFile : boxUserFileList) {
                    String key = aes256Util.decrypt(boxUserFile.getFileUrl());
                    if (key != null) {
                        key = key.substring(30);
                        amazonS3Client.deleteObject(bucket, key);
                    }
                }
                boxUserRepository.delete(boxUser);
            }
        } catch (Exception e) {
            log.error("?????? ?????? ??? ?????? ?????? : " + e.getMessage());
            return false;
        }

        // 1-3. ?????? ????????? ????????? ?????? ??????
        for (S3ObjectSummary file : amazonS3Client.listObjects(bucket, "profile/" + userSeq + "/").getObjectSummaries()) {
                amazonS3Client.deleteObject(bucket, file.getKey());
        }

        // 1-4. ?????? ?????? ??????
        Optional<User> findUser = userRepository.findById(userSeq);
        if (findUser.isPresent() == false) { // ?????? ?????? ?????? ??????
            log.error("deleteUser - DB??? ?????? ????????? ????????????.");
            return false;
        }
        userRepository.deleteById(userSeq);

        // 1-5. ?????? ??????
        Boolean completeDel = userService.deleteToken(request);
        if (completeDel == false) {
            return false;
        }

        // 2. ????????? ?????? ??????
        kakaoOAuth2.unlinkUser(findUser.get().getUserKakaoId());
        return true;
    }
}
