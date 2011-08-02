package plugins;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import play.Logger;
import play.Play;
import play.PlayPlugin;




public class MyPlugin extends PlayPlugin {
	
	Model model = new Model();
	Member member = new Member();
	Association association = new Association();

    public static final Map<String, Object> models = new HashMap<String, Object>();

    @Override
    public void onApplicationStart() {

        List<Class> entities = Play.classloader.getAnnotatedClasses(Entity.class);
        for (Class clazz : entities) {
            String tableName = clazz.getCanonicalName();
            Annotation classAnnotation = clazz.getAnnotation(Table.class);
            if (classAnnotation != null) {
                tableName = ((Table) classAnnotation).name();
            }
            model.name = clazz.getName();
            model.table_name = tableName;
            System.out.println("Model: " + model.name + " Table: " + model.table_name);
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                boolean nullable = true;
                boolean unique = false;
                member.nullable = nullable;
                member.unique = unique;
                association.target_model = field.getName();
                Annotation[] annotations = field.getDeclaredAnnotations();
                for (Annotation annotation : annotations) {
                    association.type = annotation.annotationType().getSimpleName();
                    System.out.println("Type: " + association.type);
                }
                
                Column column = field.getAnnotation(Column.class);
                if (column != null) {
                    nullable = column.nullable();
                    unique = column.unique();
                }
                System.out.println(" - " + association.target_model);
                System.out.println(" #unique: " + member.unique + " , nullable: " + member.nullable);
            }
            System.out.println();
        }
    }
}
