package models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import play.db.jpa.Model;

@Entity
public class Event extends Model {

    @Column(name = "yer")
    public String location;

    public Date time;

    @ManyToOne
    @JoinColumn(name = "olusturan")
    public User author;

}
