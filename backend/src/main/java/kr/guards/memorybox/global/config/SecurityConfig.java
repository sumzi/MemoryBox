package kr.guards.memorybox.global.config;

import kr.guards.memorybox.global.auth.JwtExceptionFilter;
import kr.guards.memorybox.global.auth.OAuth2TokenAuthenticationFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private OAuth2TokenAuthenticationFilter oAuth2TokenAuthenticationFilter;
    private JwtExceptionFilter jwtExceptionFilter;
    private CustomAccessDeniedHandler customAccessDeniedHandler;
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // csrf 미적용
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()
                .httpBasic().authenticationEntryPoint(customAuthenticationEntryPoint)   // 인증 되지 않은 유저가 요청했을때 동작
                .and()
                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler) // 액세스 할 수 없는 요청 했을 시 동작
                .and()
                .authorizeRequests()
                .antMatchers("/api/user", "/api/user/logout").hasRole("USER")
                .antMatchers().permitAll()
                .anyRequest().permitAll()
                .and().cors();
        http.addFilterBefore(oAuth2TokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtExceptionFilter, OAuth2TokenAuthenticationFilter.class);
    }


}
