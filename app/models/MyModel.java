package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "my_model2")
public class MyModel extends Model {

    public Integer sayi;
    
}
