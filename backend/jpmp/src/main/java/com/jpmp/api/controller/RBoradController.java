package com.jpmp.api.controller;


import com.jpmp.api.dto.request.nft.NtfRequestReqDto;
import com.jpmp.api.dto.request.user.UserLoginReqDto;
import com.jpmp.api.dto.request.user.UserModifyReqDto;
import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.api.dto.response.user.UserLoginResDto;
import com.jpmp.api.dto.response.user.UserResDto;
import com.jpmp.api.service.nft.RBoradService;
import com.jpmp.api.service.user.UserService;
import com.jpmp.common.util.JwtTokenUtil;
import com.jpmp.common.util.SecurityUtils;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.user.UserRepository;
import com.jpmp.exception.CustomException;
import com.jpmp.exception.ErrorCode;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;


@Slf4j
@Validated
@Api(tags = "실물화 보드")
@RestController
@RequestMapping("/api/realization_board")
@RequiredArgsConstructor
public class RBoradController {

    private final RBoradService rBoradService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @PostMapping()
    @ApiOperation(value = "실물화 요청", notes = "해당 기업에게 실물화를 요청한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @ApiIgnore Authentication authentication,
            @Valid @RequestBody @ApiParam(value = "jwt 토큰 , 기업 이름 , nft 정보 요청", required = true) NtfRequestReqDto ntfRequestReqDto) {
        User user = userRepository.findByUsername(getUsername());

        rBoradService.addRBorad(user, ntfRequestReqDto);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }


    @GetMapping("/user")
    @ApiOperation(value = "실물화 유저 요청리스트", notes = "자신의 실물화를 요청리스트를 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> getUserRBoradList() {

        return null;
    }

    @GetMapping("/enterpris")
    @ApiOperation(value = "실물화 기업 요청리스트", notes = "기업이 소비자가 요청한 실물화리스트를 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> getEnterpriseRBoradList() {

        return null;
    }

    @PutMapping()
    @ApiOperation(value = "실물화 요청리스트 상태변경", notes = "기업이 실물화리스트 상태를 변경 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> updateRBoradList() {

        return null;
    }

    @DeleteMapping()
    @ApiOperation(value = "실물화 요청리스트 삭제", notes = "실물화 요청리스트 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> deleteRBoradList() {

        return null;
    }
    public String getUsername(){
        return SecurityUtils.getCurrentUsername()
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }
}