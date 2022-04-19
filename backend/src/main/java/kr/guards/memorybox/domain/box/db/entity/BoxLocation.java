package kr.guards.memorybox.domain.box.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "box_location")
public class BoxLocation {

    @Id
    @Column(name = "box_seq")
    private Long boxSeq;

    @Column(name = "box_loc_lat")
    private double boxLocLat;

    @Column(name = "box_loc_lng")
    private double boxLocLng;

    @Column(name = "box_loc_address")
    private String boxLocAddress;
}
