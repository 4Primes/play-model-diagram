package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;
import java.util.*;

@Entity
public class Event extends Model {
	
	public String location;
	public Date time;
	@ManyToOne
	public User author;
    
}
