package plugins;

public class Member {

    boolean id = false;

    boolean nullable = true;

    boolean unique = false;

    String name;

    String columnName;

    String type;

    Association association;
    
    int length;

    public Member(String name, Class<?> type) {

        super();
        this.name = name;
        this.columnName = name;
        this.type = type.getSimpleName(); 
        this.length=255;
    }

}
