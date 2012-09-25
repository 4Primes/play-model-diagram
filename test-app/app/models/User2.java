package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;
import java.util.*;

@Entity
public class User2 extends CreatedType {

    @Column(unique = true)
    public String username;

    public String fullname;
 
    public String password;

    @OneToMany(mappedBy = "author")
    public List<Event> events = new ArrayList<Event>();

    @ManyToMany
    public List<Friend> friends = new ArrayList<Friend>();

}
