package kr.guards.memorybox.global.auth;

import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
public class UserDetailService implements UserDetailsService{

    @Autowired
    UserService userService;

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String userAddress) throws UsernameNotFoundException {

//    		User user = userService.getUserDetailByAddress(userAddress);
//    		if(user != null) {
//    			UserDetails userDetails = new UserDetails(user);
//    			return userDetails;
//    		}
        return null;
    }
}

