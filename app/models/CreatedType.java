package models;

import java.util.Date;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import play.db.jpa.Model;

@MappedSuperclass
public class CreatedType extends Model {

    public Date created;

    public Date modified;

    @PrePersist
    protected void prePersist() {

        this.created = this.modified = new Date();
    }

    @PreUpdate
    protected void preUpdate() {

        this.modified = new Date();
    }
}
