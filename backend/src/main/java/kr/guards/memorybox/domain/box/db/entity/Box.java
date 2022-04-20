package kr.guards.memorybox.domain.box.db.entity;

import kr.guards.memorybox.domain.user.db.entity.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "box")
public class Box {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "box_seq")
    private Long boxSeq;

    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "box_name")
    private String boxName;

    @Column(name = "box_description")
    private String boxDescription;

    @CreatedDate
    @Column(name = "box_created_at")
    private LocalDateTime boxCreatedAt;

    @Column(name = "box_open_at")
    private LocalDateTime boxOpenAt;

    @Column(name = "box_loc_name")
    private String boxLocName;

    @Column(name = "box_isSolo")
    private boolean boxIsSolo;

    @OneToOne
    @JoinColumn(name = "user_seq", insertable = false, updatable = false)
    private User user;

    @Builder
    public Box(Long userSeq, String boxName, String boxDescription, LocalDateTime boxOpenAt, String boxLocName, boolean boxIsSolo) {
        this.userSeq = userSeq;
        this.boxName = boxName;
        this.boxDescription = boxDescription;
        this.boxOpenAt = boxOpenAt;
        this.boxLocName = boxLocName;
        this.boxIsSolo = boxIsSolo;
    }
}
