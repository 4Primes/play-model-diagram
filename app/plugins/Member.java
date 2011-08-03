package plugins;

public class Member {
	boolean nullable = true;
	boolean unique = false;
	String name;
	String columnName;
	String type;
	Association association;

	public Member(String name, Class<?> type) {
		super();
		this.name = name;
		this.columnName = name;
		this.type = type.getSimpleName();
	}

}
